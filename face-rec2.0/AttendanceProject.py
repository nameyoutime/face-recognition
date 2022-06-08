import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
import requests
import json


student = []
attendance= []

ip = "http://localhost:8080/api/attendance"
headers = {u'content-type': u'application/json'}

id = input('Please enter id: ')
x = requests.get(ip+'/id?id='+id)
data = json.loads(x.text)
while True:
    if data["data"]=="error":
        id = input('error please enter id again:')
        x = requests.get(ip+'/id?id='+id)
        data = json.loads(x.text)
        continue;
    else:
        break;

temp = data["data"]["students"]

for i in temp:
    fullName = i['fullName']
    sid = i["sid"]
    appen = str(fullName)+"-"+str(sid)
    student.append(appen)
print(student);

def check_in_arr(name):
    
    if name == "Unknown":
        return
    flag = name in attendance
    if name in student:
        if flag == False:
            print(name)
            attendance.append(name)
            putHttp(name)
def putHttp(name):
    payload = {"attendance":{"id":id,"nameSid":name}}
    print(payload)
    requests.put(ip+"/face/id",headers = headers,data = json.dumps(payload))
    
path = 'Images_Attendance'
images = []
classNames = []
myList = os.listdir(path)
# print(myList)
for cl in myList:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])
# print(classNames)

def findEncodings(images):
    encodeList =[]
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList

def markAttendance(name):
    with open('Attendance.csv', 'r+') as f:
        myDataList = f.readlines()
        nameList = []
        for line in myDataList:
            entry = line.split(',')
            nameList.append(entry[0])
        if name not in nameList:
            time_now = datetime.now()
            tString = time_now.strftime('%H:%M:%S')
            dString = time_now.strftime('%d/%m/%Y')
            f.writelines(f'\n{name},{tString},{dString}')

encodeListKnown = findEncodings(images)
print('Encoding Complete')

cap = cv2.VideoCapture(0)

while True:
    success, img = cap.read()
    imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    facesCurFrame = face_recognition.face_locations(imgS)
    encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

    for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
        matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
        faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
        # print(faceDis)
        matchIndex = np.argmin(faceDis)
        if matches[matchIndex]:
            name = classNames[matchIndex]
            # print(name)
            check_in_arr(name)
            y1, x2, y2, x1 = faceLoc
            y1, x2, y2, x1 = y1*4, x2*4, y2*4, x1*4
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.rectangle(img, (x1, y2-35), (x2, y2), (0, 250, 0), cv2.FILLED)
            cv2.putText(img, name, (x1+6, y2-6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
            markAttendance(name)
    cv2.imshow('webcam', img)
    key = cv2.waitKey(1)
    if key == 27:
        break
cap.release()
cv2.destroyAllWindow()


