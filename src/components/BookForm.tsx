import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import DateInput from "../components/DateInput";
import "@styles/BookForm.scss";
import Button from "./Button";
import "@styles/Button.scss";
import { Book } from "../utils/types";

type FormValues = Omit<Book, "id">;

type BookFormProps = {
  initialValues?: FormValues;
  onSubmit: SubmitHandler<FormValues>;
  buttonLabel: string;
  closeModal: () => void;
};

const BookForm: React.FC<BookFormProps> = ({
  initialValues,
  onSubmit,
  buttonLabel,
  closeModal,
}) => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: initialValues || {
      title: "",
      author: "",
      description: "",
      cover: "",
      publicationDate: "",
    },
  });

  const onSubmitForm: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
    reset();
    closeModal();
  };

  return (
    <form className="book-form" onSubmit={handleSubmit(onSubmitForm)}>
      <h3>Add Book</h3>
      <div className="form-header">
        <Input
          placeholder="Title"
          register={register("title", { required: true })}
          autoFocus
          required
        />
        <Input
          placeholder="Author"
          register={register("author", { required: true })}
          required
        />
        <Textarea
          placeholder="Description"
          register={register("description", { required: true })}
          required
        />
        <Input
          placeholder="Cover URL"
          register={register("cover", { required: true })}
          required
        />
        <DateInput
          placeholder="Publication Date"
          register={register("publicationDate", { required: true })}
          required
        />
      </div>
      <div className="button-container">
        <Button variant="primary" type="submit">
          {buttonLabel}
        </Button>
        <Button className="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default BookForm;
