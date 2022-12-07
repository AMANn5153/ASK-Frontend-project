import React from 'react';
import './Design.css'



const Design=(props)=>{
    return(
        <div className="cards">
                  <div>{props.head} </div>
                  <div className='design-div'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -510 1440 320"><path fill={props.color} 
                  fillOpacity="1" d="M0,192L18.5,192C36.9,192,74,192,111,176C147.7,160,185,128,222,122.7C258.5,117,295,139,
                  332,154.7C369.2,171,406,181,443,170.7C480,160,517,128,554,138.7C590.8,149,628,203,665,202.7C701.5,203,
                  738,149,775,133.3C812.3,117,849,139,886,154.7C923.1,171,960,181,997,170.7C1033.8
                  ,160,1071,128,1108,112C1144.6,96,1182,96,1218,106.7C1255.4,117,1292,139,1329,138.7C1366.2,139,1403,117,1422,
                    106.7L1440,96L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,
                    1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,
                    320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,
                    320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,
                    111,320C73.8,320,37,320,18,320L0,320Z"></path></svg> 
                    
                       </div>                
                </div>

    )
}
export default Design;