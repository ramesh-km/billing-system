import { Flex,Text } from '@mantine/core'
import ItemFormLayout from '../layouts/ItemFormLayout';
import { createItem } from '../api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {ItemData} from '../layouts/ItemFormLayout'


function CreateItem() {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation(createItem)

  const onFormSubmit = async (data) => {
    await mutateAsync({ ...data })
    navigate('/')
  }
  return (
    <>
      <Text pt='4rem' sx={{ fontSize: "1.5rem", fontWeight: 600, textAlign: "center" }}>
        Create Item
      </Text>
      <Flex justify="center" align="center" >
        <ItemFormLayout onFormSubmit={onFormSubmit} />
      </Flex>
    </>
  );
}

export default CreateItem