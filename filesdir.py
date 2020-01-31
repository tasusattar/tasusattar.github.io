import os
import json


def recdir(dirpath, title):

    outjson = {
        'unfiltitle': title,
        'files': [],
        'dirs': [],
        'dscrp': '',
        'html': ''
    }

    directory = os.listdir(dirpath)
    if len(directory) == 0:
        print("OH NO!")
        return outjson

    nohijstxtdir = []

    for subpath in directory:
        fullpath = dirpath + '/' + subpath
        # check if subpath is an .html in which case
        # this is all the info we need
        if subpath[-5:] == '.html':
            outjson['html'] = fullpath
            return outjson

        # check if subpath is a .txt for desc or if its not a json
        # in which case add it to filtered list
        if subpath[-4:] == '.txt':
            fulldesc = ''
            with open(fullpath, 'r') as file:
                data = file.read().replace('\n', '')
                fulldesc = data
            outjson['dscrp'] = fulldesc
        elif (not subpath.startswith('.')) and subpath[-5:] != '.json':
            nohijstxtdir.append(subpath)

    # is the filtered list empty?
    if len(nohijstxtdir) == 0:
        print('HELP!')
        return outjson

    for subpath in nohijstxtdir:
        # add to files if its a file, add a new dict obj to dirs if a dir
        # recursively generate the list of dirs
        fullpath = dirpath + '/' + subpath
        if os.path.isfile(fullpath):
            outjson['files'].append(fullpath)
        elif os.path.isdir(fullpath):
            outjson['dirs'].append(recdir(fullpath, subpath))

    return outjson


dirthouse = 'icons'

final = recdir(dirthouse, dirthouse)

outson = {
    'HOME0': {},
    'PORTFOLIO1': {},
    'ABOUT3': {},
    'WORK2': {},
    'TRAVELS1': {},
    'MUSINGS2': {}
}

for key in outson:
    # tit = key[:-1]
    pages = recdir(key, key)
    outson[key] = pages


with open('allpgs.js', 'w') as outfile:
    outfile.write('var outson = ')
    json.dump(outson, outfile)

print(final)
