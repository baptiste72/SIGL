import json

class data_treatement:
    # fonction de manipulation de données pour renvoyer l'arborescence des notes
    def treeNotes(data):
        data = json.dumps(data)
        data = json.loads(data)
        treeList=[]
        js = {}
        for i in data :
            if i["semester"] not in treeList:
                    treeList.append(i["semester"])
                    js[i["semester"]]=[]
            js[i["semester"]].append([i["title"],i["id"]])

        response=[]
        for k, v in js.items():
            d = {}
            d["name"]=k
            nL=[]
            for i in v:
                dchildren={}
                dchildren["name"]=i[0]
                dchildren["id"]=i[1]
                nL.append(dchildren)
            d["children"]=nL
            response.append(d)
        return response
    
    def searchNote(request,data):
        for i in data:
            if i["id"]==request:
                return i