import axios from "axios";
import { User } from "interfaces/user";
import React, { useEffect, useState, Fragment } from "react";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useHistory } from "react-router-dom";

export function Home() {
    // const url = "http://127.0.0.1:4000";
    const url = "https://teste-123proj.herokuapp.com";
    const [users, setUsers] = useState<User[]>([]);
    const initialStateUser: User = { id: undefined, nome: "", cpf: "", telefone: "", data_nascimento: "" };
    const [user, setUser] = useState(initialStateUser);
    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("token") != null)
            getAllUsers();
        else
            history.push("/login");
    }, []);

    function getAllUsers() {
        axios.get<User[]>(`${url}/user/getAll`).then((response) => {
            setUsers(response.data);
        });
    }

    function editUser(user_id: number | undefined) {
        users.map((item) => {
            if (item.id == user_id) {
                setUser(item);
            }
        });
    }

    function handleOnKeyPress(e: any, inputName: string) {
        let value = null;
        if (typeof e.target.value === 'undefined') {
            value = e.target.getAttribute("data-value");
        } else {
            value = e.target.value;
        }

        setUser({ ...user, [inputName]: value })
    }

    function saveUser(e: any) {
        e.preventDefault();
        if (user.id != null) {
            axios.put(`${url}/user/update/${user.id}`, user).then((response) => {
                setUser(initialStateUser);
                getAllUsers();
            });
        } else {

            axios.post(`${url}/user/create`, user).then((response) => {
                setUser(initialStateUser);
                getAllUsers();
            });
        }
    }

    function deletarUser() {
        axios.delete(`${url}/user/delete/${user.id}`).then((response) => {
            setUser(initialStateUser);
            getAllUsers();
        });
    }

    function logoutUser() {
        localStorage.removeItem("token");
        history.push("/login");
    }

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="relative flex items-center justify-between h-16">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">

                                    {/* <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div> */}
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <a href="#" onClick={logoutUser} className="text-white">Sair</a>
                                </div>
                            </div>
                        </div>

                    </>
                )}
            </Disclosure>
            <div className="container mx-auto">
                <div className="mt-10 sm:mt-0">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="mt-5" onSubmit={e => saveUser(e)}>
                            <input type="hidden" name="id" id="id" value={user.id} />
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                CPF
                                            </label>
                                            <input
                                                type="text"
                                                name="cpf"
                                                id="cpf"
                                                value={user.cpf}
                                                autoComplete="given-name"
                                                required
                                                onChange={e => handleOnKeyPress(e, 'cpf')}
                                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Nome
                                            </label>
                                            <input
                                                type="text"
                                                name="nome"
                                                id="nome"
                                                onChange={e => handleOnKeyPress(e, 'nome')}
                                                value={user.nome}
                                                required
                                                autoComplete="family-name"
                                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Telefone
                                            </label>
                                            <input
                                                type="text"
                                                name="telefone"
                                                id="telefone"
                                                autoComplete="off"
                                                value={user.telefone}
                                                required
                                                onChange={e => handleOnKeyPress(e, 'telefone')}
                                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Data nascimento
                                            </label>
                                            <input
                                                type="date"
                                                name="data_nascimento"
                                                id="data_nascimento"
                                                autoComplete="off"
                                                required
                                                value={user.data_nascimento}
                                                onChange={e => handleOnKeyPress(e, 'data_nascimento')}
                                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    {
                                        user.cpf != null && typeof user.id != "undefined" ?
                                            <button
                                                type="button"
                                                onClick={deletarUser}
                                                className="inline-flex justify-center py-2 px-4 mr-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Deletar
                                            </button>
                                            :
                                            <></>
                                    }

                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col mt-5">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Nome
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Cpf
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Telefone
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Data nascimento
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Editar</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user.cpf}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{user.nome}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{user.cpf}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{user.telefone}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.data_nascimento}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={e => editUser(user.id)}>
                                                        Editar
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}