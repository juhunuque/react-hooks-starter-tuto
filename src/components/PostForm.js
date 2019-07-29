import React, {useState, Fragment, useEffect} from 'react'
import axios from 'axios'

const PostForm = ({addPost, editingPost}) => {
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState({title: '', body: ''})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setPost(editingPost)
    }, [editingPost])

    const validateForm = () => {
        const tempErrors = {};
        if(post.title.trim() === '') {
            tempErrors.title = 'Title must not be empty'
        }

        if(post.body.trim() === '') {
            tempErrors.body = 'Body must not be empty'
        }

        if(Object.keys(tempErrors).length > 0) {
            setErrors(tempErrors)
            return false
        }
        return true
    }

    const onChange = (event) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setLoading(true)

        if(!validateForm()) {
            setLoading(false)
            return
        }

        setErrors({})

        if(post.id) {
            axios.put(`/post/${post.id}`, post)
                .then(res => {
                    console.log(res.data)
                    setLoading(false)
                    addPost(res.data)
                    setPost({title: '', body: ''})
                })
                .catch(err => console.error(err))
        } else {
            axios.post('/post', post)
                .then(res => {
                    console.log(res.data)
                    setLoading(false)
                    addPost(res.data)
                    setPost({title: '', body: ''})
                })
                .catch(err => console.error(err))
        }
    }

    return(
        <Fragment>
            {!loading ? (
                <form className="push-in" onSubmit={onSubmit}>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title"
                               value={post.title} onChange={onChange}
                               className={errors.title && 'invalid'} />
                        <span className="helper-text">{errors.title}</span>
                    </div>
                    <div className="input-field">
                        <label htmlFor="body">Body</label>
                        <input type="text" name="body"
                               value={post.body} onChange={onChange}
                               className={errors.body && 'invalid'} />
                        <span className="helper-text">{errors.body}</span>
                    </div>
                    <button type="submit" className="waves-effect waves-light btn">
                        {post.id ? 'Update' : 'Add'}
                    </button>
                </form>
            ) : (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            )}
        </Fragment>
    )
}

export default PostForm