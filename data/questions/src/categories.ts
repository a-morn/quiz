import { v4 as uuid } from "uuid";
import { Category } from 'enlighten-common-types'


const categories: Category[]= [{
        _id: uuid(),
        label: 'Countries',
        background: `/countries/world-map.jpeg`,
        backgroundBase64:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAkACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APru28AeD9RtLDUtO8XQapPqPhnwHN8Q9cvb7U/EuoaZrNzq5XUNE1K40+yvLnw1I+t6WNI8PPpdzb6fqVpaw6FFJqbRzXCfzrVcITcJe+rzhrGHJOMOZxbhJqElzSk5Jxdru6snE/SqdWrOnCdOpOp7KU6kOWc6jhOoowq8lRXqNQVBRUbtQVPlhySnKT8f1DSNeF/fC1WyurUXlyLa5W0titzbiZ/JnU3fha3uis0e2QG5t4LghszQxSbkXaMcJFKMqdFSSSaVOLSaVmk41OVq/wDLp20GsTjZe97ST5veu6lS7vrd+7uzltO/5EG8/wCxZ8Gf+ne6qY/73U/7CMR+pww/3b/uEvzkbF9/x+3n/X1cf+jXrOHwR/wx/JGR/9k=',
    }, {
        _id: uuid(),
        label: 'Game of Thrones',
        background: `/game-of-thrones/got-tapestry.jpg`,
        backgroundBase64:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAcACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOo/YF/aO/ZXuv2X9KfxN8P/AA9p1xqXgES6ncWvhzVtUmW9n08PPe3iy2CRvJp19ZapFGLU3h1CGSyR3to45Hb83zCjj54ipHD4mdGq6c405cydKMnK8Jyp395wkldXtKN46Jtn21KWEcIqpR9pFSi3G9rpaOEZWTXOmve05Gr2l0/m7+Iuhfs1r8QfHS2ulfEOS1HjLxOLaS18QLp1s8A1u+EL22nppypYwNHtMNmiqtrGVgVQEAr6GnDF+zhdxvyRv78t7K+y7nkSlTcpWSS5nZWbsr6K7u3bbVv1Z//Z',
    }, {
        _id: uuid(),
        label: 'Music Theory',
        background: `/music-theory/abandoned-art-school.jpg`,
        backgroundBase64:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAcACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOj/AGAPA/w0+O/7cvib4h+JP2bPg74Kh+A3xh1D4c+G9E0rwd4Rs7jRdcn8Gt4D0COxfSYNVs4tI8GeHtD1DxZcGxmi1TVvHHjAXz67qsUM6aL8F4q8V4fLc0nwtiIy+v1sfPDYunTo04UFRozoezjP2adFqo3StGjePIqqrtykk+HKckp/2Tgc6p1K7oZphY4qhzYvFVIz5L+2n7KtUbhNTtFucIuUoxnBJJt/sBqvxY/Y+sNT1Gx8S/CjwzqPiKzv7y01/UE8EWpS/wBat7iSHVbxSbHJW6vknnUnnDivzxVsaklTjTULe4pSTlyfZu+V3drX1evU9ZYiokk5zbSSbvv57n//2Q==',
    }, {
        _id: uuid(),
        label: 'Computer Science',
        background: `/computer-science/hhkb2.jpg`,
        backgroundBase64:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAkACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APru28AeD9RtLDUtO8XQapPqPhnwHN8Q9cvb7U/EuoaZrNzq5XUNE1K40+yvLnw1I+t6WNI8PPpdzb6fqVpaw6FFJqbRzXCfzrVcITcJe+rzhrGHJOMOZxbhJqElzSk5Jxdru6snE/SqdWrOnCdOpOp7KU6kOWc6jhOoowq8lRXqNQVBRUbtQVPlhySnKT8f1DSNeF/fC1WyurUXlyLa5W0titzbiZ/JnU3fha3uis0e2QG5t4LghszQxSbkXaMcJFKMqdFSSSaVOLSaVmk41OVq/wDLp20GsTjZe97ST5veu6lS7vrd+7uzltO/5EG8/wCxZ8Gf+ne6qY/73U/7CMR+pww/3b/uEvzkbF9/x+3n/X1cf+jXrOHwR/wx/JGR/9k=',
    }
]

export default categories
