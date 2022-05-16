import cv2
from simple_facerec import SimpleFacerec
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
# Encode faces from a folder
sfr = SimpleFacerec()
sfr.load_encoding_images("images/")

def check_in_arr(name):
    if name == "Unknown":
        return
    flag = name in attendance
    if name in student:
        if flag == False:
            attendance.append(name)
            putHttp(name)
def putHttp(name):
    payload = {"attendance":{"id":id,"nameSid":name}}
    print(payload)
    requests.put(ip+"/id",headers = headers,data = json.dumps(payload))

# Load Camera
cap = cv2.VideoCapture(0);

while True:
    ret, frame = cap.read();

    # Detect Faces
    face_locations, face_names = sfr.detect_known_faces(frame)
    for face_loc, name in zip(face_locations, face_names):
        y1, x2, y2, x1 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]

        cv2.putText(frame, name,(x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 200, 0), 2)
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 200, 0), 4)
        check_in_arr(name)

    cv2.imshow("Frame", frame)

    key = cv2.waitKey(1)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()
