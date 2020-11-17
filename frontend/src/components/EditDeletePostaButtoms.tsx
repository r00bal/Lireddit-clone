import React from 'react';
import { Box, IconButton, Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostaButtomsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostaButtoms: React.FC<EditDeletePostaButtomsProps> = ({
  id,
  creatorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box>
      <NextLink href='/post/edit/[id]' as={`/post/edit/${id}`}>
        <IconButton as={Link} mr={4} icon='edit' aria-label='Edit post' />
      </NextLink>

      <IconButton
        icon='delete'
        aria-label='Delete post'
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
};
