import React from 'react'

import './index.scoped.scss'

function ListItem ({ children, user, nums }: any) {

    const browseCount = (count: number) => {
      if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
      return count
    }

    return (
        <div className={'list-item'}>
            <div className={'item-top'}>
                <div className={'user'}>
                    <img
                        className={'avatar'}
                        src={user.img}
                        alt=""/>
                    <div className={'user-name'}>
                        <div className={'name'}>{user.nickName}</div>
                        <div className={'date'}>1天前</div>
                    </div>
                </div>
                <div className={'follow'}>+关注</div>
            </div>
            {children}
            <div className={'item-bottom'}>
                <div className={'read-count'}>{browseCount(nums.browseCount)} 阅读</div>
                <div className={'right-btn'}>
                    <div className={'btn-item'}>
                        <div className={'btn-icon'}/>
                        <div className={'btn-label'}>45</div>
                    </div>
                    <div className={'btn-item'}>
                        <div className={'btn-icon'}/>
                        <div className={'btn-label'}>评论</div>
                    </div>
                    <div className={'btn-item'}>
                        <div className={'btn-icon'}/>
                        <div className={'btn-label'}>分享</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListItem