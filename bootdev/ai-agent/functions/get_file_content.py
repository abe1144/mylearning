# functions/get_file_content.py
import os
from google.genai import types

MAX_CHARS = 10000


def get_file_content(working_directory, file_path):
    try:
        abs_working = os.path.abspath(working_directory)
        abs_file = os.path.abspath(os.path.join(working_directory, file_path))

        if not abs_file.startswith(abs_working):
            return f'Error: Cannot read "{file_path}" as it is outside the permitted working directory'

        if not os.path.isfile(abs_file):
            return f'Error: File not found or is not a regular file: "{file_path}"'

        with open(abs_file, "r") as f:
            content = f.read(MAX_CHARS)
            if f.read(1):
                content += f'[...File "{file_path}" truncated at {MAX_CHARS} characters]'

        return content
    except Exception as e:
        return f"Error: {e}"

    
schema_get_file_content = types.FunctionDeclaration(
    name="get_file_content",
    description="Open files in a specified directory relative to the working directory, and reading its content",
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
