import React, { FC } from 'react';
import { IItemModel, IItemFilter } from '@pbr-simcity/types/types';
import { useForm } from 'react-hook-form';

export interface ItemFilterProps {
  defaultValues: IItemFilter;
  setFilter: Function;
}

const ItemFilter: FC<ItemFilterProps> = ({ defaultValues, setFilter }) => {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });
  const onSubmit = handleSubmit((data) => setFilter({
    level: parseInt(data.level),
  }));

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="level">Level</label>
      <input name="level" id="level" type="number" ref={register()} />
      <button>Filtrar</button>
    </form>
  );
};

export default ItemFilter;
