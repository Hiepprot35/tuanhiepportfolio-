import { useEffect, useState, useRef } from "react";

function ChangeBackground({onChangeBackground}) {
   
    
    const [imgBackground, SetimgBackground] = useState();
    useEffect(() => {


        return () => {
    
          imgBackground && URL.revokeObjectURL(imgBackground.link)
        }
    
      }, [imgBackground]);
    const imgFile = (e) => {

        let imgLocal = e.target.files[0];
    
        if (imgLocal) {
    
          imgLocal.link = URL.createObjectURL(imgLocal);
    
          SetimgBackground(imgLocal)
          onChangeBackground(imgLocal)
        }
      }
    return (
        <div className="ChangeBackground">
            <div>
                <input
                    type="submit"
                    className="sumbit"
                    id="Doianhbia"
                    value=" Đổi ảnh bìa"
                />
            </div>
            <div>
                <input

                    type="file"
                    name="anhbia"
                    className="dangnhapinput--1"
                    id="anhbia"
                    onChange={imgFile}
                />
            </div>


        </div>
    )
}
export default ChangeBackground