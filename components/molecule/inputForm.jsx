import { useContext } from 'react';

import { AdminContext } from '../../Context/AdminContext';

export const inputForm = (label, placeholder, state, setState) => {
    const { isForm, setIsForm } = useContext(AdminContext);
    const { title } = isForm;

    return (
        <>
            <div className="form-group">
                <label className="text-muted">{label}</label>
                <input
                    placeholder={placeholder}
                    type="text"
                    value={title}
                    className="form-control"
                    onChange={(e) =>
                        setIsForm({ ...isForm, title: e.target.value })
                    }
                    required
                />
            </div>
        </>
    );
};
