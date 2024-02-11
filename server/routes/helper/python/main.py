import os
import sys
from time import time
from tokenize import TokenError
from runner import Runner
from transpile import transform
from astunparse import unparse
import global_sandbox
import json
ENV = os.getenv('ENV')
FILENAME = os.getenv('FILENAME')
VOL = os.getenv('VOLUME')
DATA_VERSION = os.getenv('DATA_VERSION')


def type_override(obj):
    if isinstance(obj, ObjectProxy):
        return type(obj.__wrapped__)
    else:
        return type(obj)


def execute(code):
    inp = ["", {}]

    try:
        tree = transform(code, inp)
        transpiled = unparse(tree)
    except SyntaxError as syn_e:
        raise syn_e
    except TokenError as tok_e:
        raise tok_e
    except Exception as e:
        raise Exception('TranspilerError: ' + str(e))

    _name, imports = inp

    runner = Runner(_name, code)
    start = time()

    try:
        exec(transpiled, global_sandbox.create(_name, runner, imports))
    except Exception as e:
        runner.steps.append({
            'type': 'ERROR',
            'error': str(e)
        })
    runtime = int((time() - start) * 1000)

    return json.dumps(
        {
            'steps': runner.steps,
            'objects': runner.objects,
            'types': runner.types,
            'objectIndex': runner.objectIndex,
            'version': 1,
            'runtime': runtime,
            'code': code
        }
    )


try:
    data = execute(sys.argv[1])
    print(data)
except Exception as e:
    print(str(e))
