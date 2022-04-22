import cv2

# 0 is for cam1, 1 for 2 and so on
cap = cv2.VideoCapture(0)

# run main loop
# if we show one image after antoher, it becomes video
while True:
    ret, frame = cap.read()          # read from camera
    
    cv2.imshow('frame',frame)         # show image
    if cv2.waitKey(10) == ord('q'):  # wait a bit, and see keyboard press
        break                        # if q pressed, quit

# release things before quiting
cap.release()
cv2.destroyAllWindows()