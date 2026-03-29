import { KInputProps } from "../types";
import BaseInput from "./Base";
import Multiple from "./Multiple";
import SelectInput from "./Select";
import AutocompleteInput from "./Autocomplete";
import { KAutocompleteProps } from "./Autocomplete";

type KInputType = {
  Base: React.FC<KInputProps>;
  Multiple: React.FC<KInputProps>;
  Select: React.FC<KInputProps>;
  Autocomplete: React.FC<KAutocompleteProps>;
};

class KInput {
  static Base: KInputType["Base"] = BaseInput;
  static Multiple: KInputType["Multiple"] = Multiple;
  static Select: KInputType["Select"] = SelectInput;
  static Autocomplete: KInputType["Autocomplete"] = AutocompleteInput;
}

export default KInput;
