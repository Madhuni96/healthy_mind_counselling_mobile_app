import React, {useState,useEffect} from 'react'
import NetInfo from '@react-native-community/netinfo'

function useConnection() {

    const [connected,setConnected] = useState(true)

    useEffect(()=>{
        NetInfo.addEventListener((state)=>{
            setConnected(state.isConnected)
        })
    },[])

    return connected
}

export default useConnection
