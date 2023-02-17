/* eslint-disable indent */
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import "./Calls.css";
import { socket } from '../../socket/socket';

export function Calls() {
    // const id = useSelector((state) => state.messages.id);

    const [ me, setMe ] = useState("");
    const [ stream, setStream ] = useState();
    const [ caller, setCaller ] = useState("");
    const [ callerSignal, setCallerSignal ] = useState();

    const myVideo = useRef('');
    const userVideo = useRef();
    const connectionRef= useRef();


    //to get access to the camera and mic
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true
        })
        //pass the stream coming from the webcam
            .then((stream) => {
                setStream(stream);
                myVideo.current.srcObject = stream;//set the ref myVideo to the stream coming from the webcam
            })
            .catch(er=> console.log(er));

        socket.on("me", (id) => {//first socket.emit in the server emmiting socket id.
            setMe(id);
        });

        socket.on("callUser", (data) => {//
            setCaller(data.from);
            setCallerSignal(data.signal);
        });
    }, []);

    //button to call (stuff from simple peer)
    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
            });
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });
        socket.on("callAccepted", (signal) => {
            peer.signal(signal);
        });

        connectionRef.current = peer;//when we end the call, we can disable that.
    };


	//answer the call
    const answerCall =() =>  {
        // setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });
        peer.on("signal", (data) => {
            socket.emit("answerCall", {
				signal: data,
				to: caller });
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };


	//leave the call
    const leaveCall = () => {
        connectionRef.current.destroy();
    };

    return (
        <div>
            <div id="calls">
				{/* video div */}
				<div >
					<div >
						<div id="my-video">
							<video playsInline muted ref={myVideo} autoPlay id="my-video"/>
						</div>
						<div id="video-div">
							<video playsInline ref={userVideo} autoPlay id="video"/>
						</div>
					</div>

					{/* buttons */}
					<div id="buttons">
						<div >
							<button onClick={() => callUser()}>Call</button>
						</div>
						<div>
							<button onClick={answerCall}>Answer</button>
						</div>
						<div>
							<button onClick={leaveCall}>End</button>
						</div>
					</div>
				</div>
            </div>
        </div>
    );
}