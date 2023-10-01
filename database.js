import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
const passwordSalt = "konstantynopolitanczykowianeczka"
dotenv.config();

const dbPromise = open({
    filename: process.env.SQLITE_FILE || ':memory:',
    driver: sqlite3.Database,
});

export async function getUsers() {
    try {
        const db = await dbPromise;
        const rows = await db.all('SELECT * FROM Users');
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

export async function getUser(id) {
    try {
        const db = await dbPromise;
        const rows = await db.all('SELECT * FROM users WHERE id = ?', [id]);
        return rows;
    } catch (error) {
        console.log('Error executing query:', error);
    }
}

export async function loginUser(username, password) {
    try {
        const db = await dbPromise;
        const result = await db.get(`
        SELECT password
        FROM users
        WHERE username = 'SomeGuyNamedAdam'
        `
        );
        if (bcrypt.compare(password, result.password)) {

            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Error executing query:', error);
    }
}

export async function createUser(username, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const db = await dbPromise;
        const result = await db.run(
            'INSERT INTO users(username, email, password) VALUES (?, ?, ?, 1)',
            [username, email, hashedPassword]
        );
        const id = result.lastID;
        return getUser(id);
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

export async function changeUserRole(username, level) {
    try {
        const db = await dbPromise;
        const result = await db.run(`
        UPDATE Users
        SET idRole = ?
        WHERE username = ?;
        `, [level, username])
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

export async function getAnimals() {
    try {
        const db = await dbPromise;
        const rows = await db.all('SELECT * FROM animals');
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

export async function getAnimal(id) {
    try {
        const db = await dbPromise;
        const rows = await db.all('SELECT * FROM animals WHERE id = ?', [id]);
        return rows;
    } catch (error) {
        console.log('Error executing query:', error);
    }
}

export async function createAnimal(name, icon_path, description) {
    try {
        const db = await dbPromise;
        const result = await db.run(
            'INSERT INTO animals(name, icon_path, description) VALUES (?, ?, ?)',
            [name, icon_path, description]
        );
        const id = result.lastID;
        return getAnimal(id);
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

export async function getSightings() {
    try {
        const db = await dbPromise;
        const rows = await db.all('SELECT * FROM sightings');
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

export async function getSighting(id) {
    try {
        const db = await dbPromise;
        const rows = await db.all('SELECT * FROM sightings WHERE id = ?', [id]);
        return rows;
    } catch (error) {
        console.log('Error executing query:', error);
    }
}

export async function createSighting(idUser, idAnimal, geoX, geoY) {
    try {
        const db = await dbPromise;
        const result = await db.run(
            'INSERT INTO Sightings(idUser, idAnimal, geoX, geoY) VALUES (?, ?, ?)',
            [idUser, idAnimal, geoX, geoY]
        );
        const id = result.lastID;
        return getSighting(id);
    } catch (error) {
        console.error('Error executing query:', error);
    }
}


export async function getCustomQuery(query, data) {
    try {
        const db = await dbPromise;
        const rows = await db.all(query, data);
        return rows;
    } catch (error) {
        console.log('Error executing query:', error);
    }
}
