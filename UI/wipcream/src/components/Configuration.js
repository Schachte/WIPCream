import React from "react";
import SettingsBlock from "./SettingsBlock";
import FluidForm from "./FluidForm";
import Editor from "./Editor";

const Configuration = props => {
  return (
    <React.Fragment>
      <SettingsBlock
        header={"Settings"}
        tooltipTitle={"Settings Information"}
        tooltipLogo={"settings"}
        description={`
          Settings currently allow you to override the defaults in terms
          of allowing certain PRs through, modifying the limit, etc.
        `}
        rowComponent={<FluidForm auth={props.auth} />}
      />
      <SettingsBlock
        header={"Automatic Reply"}
        tooltipTitle={"Comment Information"}
        tooltipLogo={"newspaper outline"}
        description={`
          Allows you to specify the comment you want to be automatically
          posted to the user before the pull-request is closed. This will
          make the user aware of why their pull request is being cancelled
        `}
        rowComponent={<Editor auth={props.auth} />}
      />
    </React.Fragment>
  );
};

export default Configuration;
