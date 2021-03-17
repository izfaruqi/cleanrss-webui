export default function StatusIndicator(){
  return <div style={{width: "1em", height: "1em", backgroundColor: /*status == 0*/ true? "green" : "red", borderRadius: 2, boxShadow: "0px 0px 6px 2px " + (/*status == 0*/ true? "rgba(0, 128, 0, 0.75)" : "rgba(128, 0, 0, 0.75)")}}></div>
}