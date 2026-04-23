import os
from google.genai import types


def get_files_info(working_directory, directory="."):
   
    try:
        abs_path = os.path.abspath(working_directory)
        target_dir = os.path.normpath(os.path.join(abs_path,directory))
        common_path = os.path.commonpath([abs_path, target_dir])
        # Will be True or False
        valid_target_dir = common_path == abs_path

        if not valid_target_dir:
            return f'Error: Cannot list "{directory}" as it is outside the permitted working directory'
        
        if not os.path.isdir(target_dir):
            return f'Error: "{directory}" is not a directory'
        
        dir_str = ""
        for item in os.listdir(target_dir):
            file_path = os.path.normpath(os.path.join(target_dir, item))
            file_size = os.path.getsize(file_path)
            is_dir = os.path.isdir(file_path)
            file_info = f"- {item}: file_size={file_size} bytes, is_dir={is_dir}"
            dir_str += file_info + "\n"

        return dir_str
    except Exception as e:
        return f"Error: {e}"

    
schema_get_files_info = types.FunctionDeclaration(
    name="get_files_info",
    description="Lists files in a specified directory relative to the working directory, providing file size and directory status",
    parameters=types.Schema(
        type=types.Type.OBJECT,
        properties={
            "directory": types.Schema(
                type=types.Type.STRING,
                description="Directory path to list files from, relative to the working directory (default is the working directory itself)",
            ),
        },
    ),
)
