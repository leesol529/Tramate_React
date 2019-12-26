import React from 'react'
import { FacebookProvider, CustomChat } from 'react-facebook';

export default class Example extends React.Component {
    render() {
        return (
            <FacebookProvider appId="123456789" chatSupport>
                <CustomChat pageId="123456789" minimized={false} />
            </FacebookProvider>
        );
    }
}