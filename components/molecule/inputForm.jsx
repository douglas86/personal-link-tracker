export const inputForm = (label, placeholder, state, setState) => {
    return (
        <>
            <div className="form-group">
                <label className="text-muted">{label}</label>
                <input
                    placeholder={placeholder}
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                        setState({ ...state, title: e.target.value })
                    }
                    required
                />
            </div>
        </>
    );
};
