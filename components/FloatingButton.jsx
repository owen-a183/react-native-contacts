import { Fab, Icon } from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default FloatingActionButton = (handlePress) => {
  return <Fab
    renderInPortal={false}
    shadow={2}
    size="sm"
    onPress={()=>handlePress()}
    icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
  />
};
