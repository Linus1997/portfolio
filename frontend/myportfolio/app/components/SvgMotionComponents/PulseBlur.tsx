




const PulseBlur = () => {





    return (<svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-0 h-0 "
        viewBox="0 0 100 100"
    >
        <defs>


            <filter id="pulseBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0">
                    <animate
                        attributeName="stdDeviation"
                        values="0.5;1;0.5"
                        
                        
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </feGaussianBlur>
            </filter>

            <filter id="pulseTest" x="-15%" y="-5%" width="100%" height="100%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0">
                    <animate
                        attributeName="stdDeviation"
                        values="0.2;2;0.2"
                        
                        
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </feGaussianBlur>
            </filter>
        </defs>
    </svg>)
}


export default PulseBlur;
