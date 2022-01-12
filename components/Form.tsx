import { ChangeEventHandler, FC, FormEventHandler, ReactNode } from 'react';

interface Props {
  fields: {
    label: string;
    type: 'text' | 'password' | 'textarea';
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  }[];
  onSubmit: FormEventHandler<HTMLFormElement>;
  button: ReactNode;
}

const Form: FC<Props> = ({ fields, onSubmit, button }) => {
  return (
    <form onSubmit={onSubmit}>
      {fields.map(({ label, type, value, onChange }) => (
        <div key={label}>
          <label>{label}</label>
          {type === 'textarea' ? (
            <textarea value={value} onChange={onChange} />
          ) : (
            <input type={type} value={value} onChange={onChange} />
          )}
        </div>
      ))}
      {button}
    </form>
  );
};

export default Form;
