import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { Layout } from '../../../components/Layout';
import { Formik, Form } from 'formik';
import InputField from '../../../components/InputField';
import { Box, Button } from '@chakra-ui/core';
import {
  useUpdatePostMutation,
  usePostQuery,
} from '../../../generated/graphql';
import { useRouter, Router } from 'next/router';
import { useGetIntId } from '../../../utils/useGetIntId';

export const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();
  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post.</Box>
      </Layout>
    );
  }
  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({ id: intId, ...values });
          router.back();
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField name='title' placeholder='title' label='Title' />
            <Box mt={4}>
              <InputField
                textarea
                name='text'
                placeholder='text...'
                label='Body'
              />
            </Box>

            <Button
              mt={4}
              type='submit'
              isLoading={isSubmitting}
              variantColor='teal'>
              update post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
