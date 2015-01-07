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
        usecase_readme_path = (path + "/README.md")
        readme      = open(usecase_readme_path,'r')
        readme_text = readme.read()
        use_case    = readme_text.split('\n', 1)[0].replace("#","").strip()
        readme.close()

        samples = os.listdir(path)
        for s in samples:
            sample_path = path + "/" + s

            if (os.path.isdir(sample_path)):
                print "    Sample: " + sample_path
                sample_readme_path = (sample_path + "/README.md")
                i = s.find("-")
                if i != -1:
                    language = s[0:i]
                    library = s[i+1:]
                else:
                    language = s
                    library = ""

                key = hashlib.md5(uc + s).hexdigest()
                samples_list[key] = { "usecase_readme_path": usecase_readme_path[1:], "usecase_name": use_case, "readme": sample_readme_path[1:], "language": language, "library": library, "path": sample_path[1:] }
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
javascript = "indexApiRosettaCode = " + json_text + ";"
file = open("./site/js/samples_index.js", "w")
file.write(javascript)
file.close()

print "Done!"

