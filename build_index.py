import os
import cgi
import json
import hashlib

SAMPLE_PATH = "./samples"

use_cases = os.listdir(SAMPLE_PATH)

samples_list      = {}
index             = {}
index["usecase"]  = {}
index["language"] = {}
index["library"]  = {}

print "Processing samples directory tree..."

for uc in use_cases:
    path = SAMPLE_PATH + "/" + uc

    if (os.path.isdir(path) and "_template_" not in path):
        print "Use case: " + path
        readme      = open(path + "/README.md",'r')
        readme_text = readme.read()
        use_case    = readme_text.split('\n', 1)[0].replace("#","").strip()
        readme_text = cgi.escape(readme_text)
        readme.close()

        samples = os.listdir(path)
        for s in samples:
            sample_path = path + "/" + s

            if (os.path.isdir(sample_path)):
                print "    Sample: " + sample_path
                sample_readme = open(sample_path + "/README.md",'r')
                sample_readme_text = sample_readme.read()
                sample_readme_text = cgi.escape(sample_readme_text)
                sample_readme.close()
                i = s.find("-")
                if i != -1:
                    language = s[0:i]
                    library = s[i+1:]
                else:
                    language = s
                    library = ""

                key = hashlib.md5(uc + s).hexdigest()
                samples_list[key] = { "usecase_readme": readme_text, "usecase_name": use_case, "readme": sample_readme_text, "language": language, "library": library, "path": sample_path[1:] }
                if use_case not in index["usecase"]:
                    index["usecase"][use_case] = []
                if language not in index["language"]:
                    index["language"][language] = []
                if library not in index["library"]:
                    index["library"][library] = []

                if key not in index["usecase"][use_case]:
                    index["usecase"][use_case].append(key)
                if key not in index["language"][language]:
                    index["language"][language].append(key)
                if key not in index["library"][library]:
                    index["library"][library].append(key)


print "Dumping json..."

json_text = json.dumps({ "samples": samples_list, "index": index })
file = open("index.json", "w")
file.write(json_text)
file.close()

print "Done!"

