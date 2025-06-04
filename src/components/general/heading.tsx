import React from "react";
import { Provider } from 'components/ui/provider';
import {Heading, Stack, Box, Avatar, HStack, Separator} from "@chakra-ui/react";
import { ColorModeButton } from "components/ui/color-mode";

const HeadingComponent: React.FC = () => {

    return (
        <Provider>
            <Stack align="center" my={8}>
                <Box flexWrap={"wrap"} display="flex" justifyContent="flex-end" width="100%" maxWidth="1200px">
                    <HStack gap={4} justifyContent="flex-end" alignItems="center">
                        <ColorModeButton border={'1px solid '} borderColor={'gray.900'} />
                        <Avatar.Root size={'xs'}>
                            <Avatar.Fallback />
                            <Avatar.Image src={'https://robohash.org/537f97cfa1240f88e1c26bec7f9a3312?set=set4&bgset=&size=400x400'} />
                        </Avatar.Root>
                    </HStack>
                </Box>

                <Box>
                    <Heading fontSize={{ base: '2xl', md: '4xl', xl: '5xl' }} py={2} mt={4} mb={6} colorScheme="orange" color='orange' textAlign="center">
                        React / TypeScript Education
                    </Heading>
                    <Heading size="md" my={4} textAlign="center">
                        Learn React and TypeScript with practical examples
                    </Heading>
                </Box>

                <Box width="100%" maxWidth="1200px" display="block" justifyContent="center" alignItems="center">
                    <Separator orientation="horizontal" my={6} colorScheme="gray" variant={'solid'}  size="md" />
                </Box>
            </Stack>
        </Provider>
    );
};

export default HeadingComponent;