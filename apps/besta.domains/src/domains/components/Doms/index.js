import React from "react";
import { DomsStyled } from "./Doms.styled";
import Doms from "./Doms";
import { arrays_mix } from "twodashes-universal/esm/arrays";
import { strings_shuffle_first2 } from "twodashes-universal/esm/strings";

let DEBUG1 = true;
class DomsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    /*
     *
     * User "container" state/props/methods!
     * This "child" component is to simplify container's render() logic.
     *
     */
    let {
      OriginalMessage = null,
      domains_generic = [],
      domain_suggested = {},
      domain_availability = {},
      ui = {},
      input_tld = "",
      input_str = "",
      input_spellchecked = "",
      tlds_checked = [],
      input_words_arr = []
    } = this.props;
    let suggestions_keys = ["generic", "tld", "com", "word hack", "phrase hack", "name"];
    let suggestions_lists = domain_suggested;
    if (!suggestions_lists["generic"]) {
      suggestions_lists["generic"] = domains_generic;
    }
    // suggestions_lists["all"] = [...domains_generic, ...(suggestions_lists["all"] || [])]
    if (!suggestions_lists["all"]) {
      suggestions_lists["all"] = domains_generic;
    }

    let render_keys = ["mix"];
    let render_lists = suggestions_lists;

    /*
     *
     * View
     *
     */
    return (
      <DomsStyled className={"DomsStyled"}>
        <Doms
          OriginalMessage={OriginalMessage}
          domain_availability={domain_availability}
          suggestions_lists={render_lists}
          suggestions_keys={render_keys}
          input_tld={input_tld}
          input_str={input_str}
          input_spellchecked={input_spellchecked}
          ui={ui}
          tlds_checked={tlds_checked}
          input_words_arr={input_words_arr}
        />
      </DomsStyled>
    );
  }
}

export default DomsIndex;
