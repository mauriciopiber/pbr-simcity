import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks'
import { ADD_PROFIT, QUERY_PROFITS } from '@pbr-simcity/web/lib/profits';

function AddProfit() {
  const { register, handleSubmit, errors } = useForm();

  const [addProfit, { data, error }] = useMutation(ADD_PROFIT, {
    refetchQueries: [
      {query: QUERY_PROFITS},
    ]
  });
  const onSubmit = (values: any) => {

    addProfit({variables: values});
  };

  if (error) {
    return (
      <div>{JSON.stringify(error)}</div>
    )
  }

  if (data) {
    return (
      <div>
        Profit added successful {data._id}
      </div>
    )
  }
  //console.log(watch('example')); // watch input value by passing the name of it

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input name="name"  ref={register({required: true})} />
      {errors.name && <span>This field is required</span>}
      <input type="submit" />
      <style jsx>
        {`
          .form {
            padding: 20px;
            background-color: #ffffff;

          }
        `}
      </style>
    </form>
  );
}

export default AddProfit;
