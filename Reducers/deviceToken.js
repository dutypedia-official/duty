const initialState=null;
const deviceToken=(state=initialState,action)=>{
    if(action.type=="DEVICE_TOKEN"){
        return action.playload
    }
    return state
}
export default deviceToken;

export const setDeviceToken=(value)=>{
    return{
        type:"DEVICE_TOKEN",
        playload:value,
    }
}