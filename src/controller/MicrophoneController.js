import {ClassEvent} from '../util/ClassEvent';

export class MicrophoneController extends ClassEvent {

    constructor() {

        //super() call the constructor from extends "ClassEvent"
        super();

        this._mimeType = 'audio/webm';

        this._available = false;

        navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {

            this._available = true;

            this._stream = stream;

            this.trigger('ready', this._stream);

        }).catch(err => {
            console.error(err);
        });

    }

    isAvailable(){

        return this._available;

    }

    stop(){

        this._stream.getTracks().forEach(track => {
            track.stop();
        });

    }

    startRecorder(){

        if (this.isAvailable()) {

            this._mediaRecorder = new MediaRecorder(this._stream, {mimeType: this._mimeType});

            this._recorded = [];

            this._mediaRecorder.addEventListener('dataavailable', e => {

                if (e.data.size > 0) this._recorded.push(e.data);

            });

            this._mediaRecorder.addEventListener('stop', e => {

                let blob = new Blob(this._recorded, {type: this._mimeType});

                let fileName = `rec${Date.now()}.webm`

                let file = new File([blob], fileName, {
                    type: this._mimeType,
                    lastModified: Date.now()
                });

                console.log(file);

            });

            this._mediaRecorder.start();

            this.startRecordMicrophoneTimer();

        }

    }

    stopRecorder(){

        if (this.isAvailable()) {

            this._mediaRecorder.stop();

            this.stop();

            //to stop timeInterval()
            clearInterval(this._recordMicrophoneInterval);


        }

    }

    startRecordMicrophoneTimer(){

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(() => {

            this.trigger('timer', (Date.now() - start)); 

        }, 100);

    }

}