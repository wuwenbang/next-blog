import { ChangeEventHandler, FC, FormEventHandler, ReactNode } from 'react';

interface Props {
  fields: {
    label: string;
    type: 'text' | 'password';
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  }[];
  onSubmit: FormEventHandler<HTMLFormElement>;
  button: ReactNode;
}

const Form: FC<Props> = ({ fields, onSubmit, button }) => {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <div key={field.label}>
          <label>{field.label}</label>
          <input
            type={field.type}
            value={field.value}
            onChange={field.onChange}
          />
        </div>
      ))}
      {button}
    </form>
  );
};

export default Form;
