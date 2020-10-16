import React from 'react';
import { Box, Link, Flex, Button, Heading } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  console.log('data ', data);
  let body = null;

  // data is loading
  if (fetching) {
    // user is not looged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href='/login'>
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>register</Link>
        </NextLink>
      </>
    );
    // user is looged in
  } else {
    body = (
      <Flex align='center'>
        <NextLink href='create-post'>
          <Button as={Link} mr={4}>
            create post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant='link'>
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex position='sticky' top={0} bg='tan' p={4} zIndex={1} align='center'>
      <Flex flex={1} m='auto' align='center' maxW={800}>
        <NextLink href='/'>
          <Link>
            <Heading>LiReddit</Heading>
          </Link>
        </NextLink>
        <Box p={4} ml={'auto'}>
          {body}
        </Box>
      </Flex>
    </Flex>
  );
};
