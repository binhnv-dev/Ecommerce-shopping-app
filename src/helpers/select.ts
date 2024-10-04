/**
 *
 * select.ts
 * this helper formulates data into select options
 */

interface Option {
    _id: string | number;
    name: string;
  }
  
  interface FormattedOption {
    value: string | number;
    label: string;
  }
  
  export const formatSelectOptions = (
    data: Option[],
    empty: boolean = false,
    from?: string
  ): FormattedOption[] => {
    let newSelectOptions: FormattedOption[] = [];
  
    if (data && data.length > 0) {
      data.map(option => {
        let newOption: FormattedOption = {
          value: option._id,
          label: option.name
        };
        newSelectOptions.push(newOption);
      });
    }
  
    if (empty) {
      const emptyOption: FormattedOption = {
        value: 0,
        label: 'No option selected'
      };
      newSelectOptions.unshift(emptyOption);
    }
  
    return newSelectOptions;
  };
  
  export const unformatSelectOptions = (
    data: FormattedOption[]
  ): (string | number)[] | null => {
    if (!data) return null;
  
    let newSelectOptions: (string | number)[] = [];
  
    if (data && data.length > 0) {
      data.map(option => {
        newSelectOptions.push(option.value);
      });
    }
  
    return newSelectOptions;
  };