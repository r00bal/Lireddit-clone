import React, { useState } from 'react';
import { Flex, IconButton } from '@chakra-ui/core';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [{ fetching, operation }, vote] = useVoteMutation();

  return (
    <Flex mr={4} direction='column' justifyContent='center' alignItems='center'>
      <IconButton
        isLoading={loadingState === 'updoot-loading'}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState('updoot-loading');
          await vote({
            postId: post.id,
            value: 1,
          });

          setLoadingState('not-loading');
        }}
        variantColor={post.voteStatus === 1 ? 'green' : undefined}
        icon='chevron-up'
        aria-label='updoot post'
      />
      {post.points}
      <IconButton
        isLoading={loadingState === 'downdoot-loading'}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState('downdoot-loading');
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState('not-loading');
        }}
        variantColor={post.voteStatus === -1 ? 'red' : undefined}
        icon='chevron-down'
        aria-label='down vote'
      />
    </Flex>
  );
};
