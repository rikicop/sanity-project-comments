import styled from "styled-components";
import { useForm } from "react-hook-form";

const FormBox = styled.div`
  display: flex;
  background-color: darkcyan;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  form {
    input,
    textarea {
      display: block;
      width: 100%;
      padding: 0.5rem 0.8rem 0.5rem 0.8rem;
      margin: 0.9vw 0;
      border: 0;
      border-radius: 5px;
      font-size: 20px;
    }
    .formBtn {
      margin: 1rem 0 1rem 0;
      border-radius: 10px;
      :hover {
        background-color: rgb(245, 245, 78);
        transition: 1s background ease;
      }
    }
  }
`;

export const Form = ({ _id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify({ ...data, _id }),
    });
    console.log(data);
  };

  return (
    <FormBox>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="name" {...register("name", { required: true })} />
        {errors.name && <p>Name is required.</p>}
        <textarea
          className="comment"
          {...register("text", { required: true })}
        />
        {errors.text && <p>Text is required.</p>}

        <input className="formBtn" type="submit" />
      </form>
    </FormBox>
  );
};
