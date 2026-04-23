import os
import subprocess
from google.genai import types


def run_python_file(working_directory, file_path, args=None):
    
    try:
        abs_path = os.path.abspath(working_directory)
        target_directory = os.path.normpath(os.path.join(abs_path, file_path))
        common_path = os.path.commonpath([abs_path, target_directory])
        valid = common_path == abs_path

        if not valid:
            return f'Error: Cannot execute "{file_path}" as it is outside the permitted working directory'

        if not os.path.isfile(target_directory):
            return f'Error: "{file_path}" does not exist or is not a regular file'
        
        if not file_path.endswith(".py"):
            return f'Error: "{file_path}" is not a Python file'

        command = ["python", target_directory]
        if args:
            command = command.extend(args)
        process_completed = subprocess.run(command,cwd=abs_path,capture_output=True,timeout=30, text=True)

        output_string = ""
        if process_completed.returncode != 0:
            output_string += f"Process exited with code {process_completed.returncode}\n"
        if not process_completed.stdout and not process_completed.stderr:
            output_string += "No output produced\n"
        if process_completed.stdout:
            output_string += f"STDOUT:\n{process_completed.stdout}"
        if process_completed.stderr:
            output_string += f"STDERR:\n{process_completed.stderr}"

        return output_string
    except Exception as e:
        return f"Error: executing Python file: {e}"


schema_run_file = types.FunctionDeclaration(
    name="run_python_file",
    description="given a python file, this function execute and run the python file",
    parameters=types.Schema(
        type=types.Type.OBJECT,
        properties={
            "working_directory": types.Schema(
                type=types.Type.STRING,
                description="Directory path to list files from, relative to the working directory (default is the working directory itself)",
            ),
            "file_path": types.Schema(
                type=types.Type.STRING,
                description="File path for the target file to be fetched and have its content read. File path should be within the working_directory",
            ),
       },
    ),
)
