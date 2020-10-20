import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';

function useBackButton(backHandler) {
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backHandler);
        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                backHandler
            );
        };
    }, [backHandler]);
}

export default useBackButton;