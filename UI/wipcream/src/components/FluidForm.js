import React from "react";

const FluidForm = () => {
  return (
    <form class="ui form attached fluid segment">
      <div class="field">
        <label>
          Exemption Prefixes (PRs pre-fixes that the bot will ignore)
        </label>
        <input placeholder="PRJ-127, PRJ-0000" type="text" />
      </div>
      <div class="field">
        <label>Max Number of Open Pull Requests Allowed</label>
        <input placeholder="10" type="text" />
      </div>
      <div class="ui blue submit button">Save Settings</div>
    </form>
  );
};

export default FluidForm;
