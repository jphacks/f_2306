import type { FC, ChangeEvent, FormEvent } from 'react';
import { SignupPre } from '../Presentational/SignupPre';
import { useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';

export interface FormValues {
  username: string,
  email: string,
  password: string,
}

/**
 * Container（サインイン画面のロジックを記述する）
 * @returns 
 */
export const SignupCon:FC = () => {
  const initialValues = { username: "", email: "", password: "" }
  const [formValues, setFormValues] = useState<FormValues>(initialValues)
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
  }

  const postData = {
    "user_name": formValues.username,
    "email": formValues.email,
    "password": formValues.password
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await axios.post('/api/signup', postData)
      router.push('/');  
    } catch(e) {
      console.log(e)
    }
  }

  return <SignupPre handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />;
};