export default function Pagination({
    prev,
    currentPage,
    getPaginationGroup,
    next,
    pages,
    handleActive,
}) {
    return (
        <>
            <div className="ta-pagination mt-70">
                <ul className="list-unstyled d-flex align-items-center justify-content-center">
                    {getPaginationGroup.length <= 0 ? null : (
                        <li onClick={prev}> {currentPage === 1 ? null : (
                            <a>
                                <i className="fa fa-arrow-left" />
                            </a>
                        )}
                        </li>
                    )}

                    {getPaginationGroup.map((item, index) => {
                        return (
                            <li onClick={() => handleActive(item)} key={index}>
                                <a className={currentPage === item ? "current" : ""}>{item}</a>
                            </li>
                        )
                    })}

                    {getPaginationGroup.length <= 0 ? null : (
                        <li onClick={next}> {currentPage >= pages ? null : (
                            <a>
                                <i className="fa fa-arrow-right" />
                            </a>
                        )}
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}