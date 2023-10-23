import styles from "./Paginator.module.scss";
import React, { useState } from "react";
import { SvgSelector } from "../svgSelector/SvgSelector";

type PaginatorPropsType = {
    page: number
    pageCount: number
    totalItemsCount: number
    onPageCallBack: (el: number) => void
    onPageCountCallBack: (el: number) => void
}

export const Pagination = ({
    page,
    pageCount,
    totalItemsCount,
    onPageCallBack,
    onPageCountCallBack,
}: PaginatorPropsType) => {

    const windowInnerWidth = window.innerWidth
    const numberPages = windowInnerWidth < 401 ? 2 : windowInnerWidth > 700 ? 5 : 3
    const startEndPages = windowInnerWidth < 401 ? 3 : windowInnerWidth > 700 ? 9 : 5

    const [visibility, setVisibility] = useState<boolean>(false)

    const pagesCount = Math.ceil(totalItemsCount / pageCount)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const pageCountHandler = () => {
        setVisibility(!visibility)
    }

    const onClickStartHandler = () => {
        onPageCallBack(1)
    }

    const onClickBackHandler = () => {
        if (page > 1) {
            onPageCallBack(page - 1)
        }
    }

    const onClickNextHandler = () => {
        if (page < pagesCount) {
            onPageCallBack(page + 1)
        }
    }

    const onClickEndHandler = () => {
        onPageCallBack(pagesCount)
    }

    return <div className={styles.paginationComponent}>
        <div className={styles.paginationBox}>
            <div className={styles.pageCountBox}>
            </div>
            <div className={styles.pagBox}>
                <div className={styles.arrowsBox}>
                    <span onClick={onClickStartHandler}><SvgSelector svgName={'LeftDoubleArrow'} /></span>
                    <span onClick={onClickBackHandler}><SvgSelector svgName={'LeftArrow'} /></span>
                </div>
                {pages.filter(el => {
                    const rightPages = page + numberPages
                    const leftPages = page - numberPages
                    const endPages = pagesCount - page
                    if (endPages < numberPages) {
                        return el > pagesCount - startEndPages
                    }
                    if (page < numberPages) {
                        return el <= startEndPages
                    }
                    return el < rightPages && el > leftPages
                }).map((el, i) => <span
                    key={i}
                    className={`${styles.pageNumber} ${page === el ? styles.selectPage : ''}`}
                    onClick={() => onPageCallBack(el)}
                >{el}</span>)}
                <div className={styles.arrowsBox}>
                    <span onClick={onClickNextHandler}><SvgSelector svgName={'RightArrow'} /></span>
                    <span onClick={onClickEndHandler}><SvgSelector svgName={'RightDoubleArrow'} /></span>
                </div>
            </div>
        </div>

    </div>
}
