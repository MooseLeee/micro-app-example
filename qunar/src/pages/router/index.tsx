import React, {ReactComponentElement} from 'react'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import './index.scoped.scss';

interface RouteFace {
    path: string
    label: string
    component: ReactComponentElement<any>
}

function Router (props: any) {

    const routers: Array<RouteFace> = props.routers

    return (
        <BrowserRouter>
            <div className={'app-container'}>
                <div className={'content-viewer'}>
                    <Routes>
                        {routers.map((item, index) => (
                            <Route
                                key={index}
                                path={item.path}
                                element={item.component} />
                        ))}
                    </Routes>
                </div>
                <div className={'nav-bar'}>
                    {routers.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={'nav-item'}>
                            <div className={'icon'}/>
                            <div className={'label'}>{item.label}</div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </BrowserRouter>
    )
}

export default Router