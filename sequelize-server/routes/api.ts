import db from '../models';
import express from 'express';
const router = express.Router();
type UserData = {
  sno: number;
  userid: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
  customerName: string;
  website: string;
  customer_address: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

//get
router.get('/', async (req, res) => {
  const users = await db.User.findAll({
    attributes: [
      'id',
      'userid',
      'firstName',
      'lastName',
      'email',
      'contact',
      'address',
      'createdAt',
      'updatedAt',
    ],
    order: [['id', 'ASC']],
    include: [
      {
        model: db.Customer,
        attributes: ['customerName', 'website', 'address'],
      },
      {
        model: db.role,
        attributes: ['roleName'],
      },
    ],
  })
    .then((result: any) => {
      let usersList: UserData[] = [];
      for (let i = 0; i < result.length; i++) {
        const ithObject = {
          sno: result[i].dataValues.id,
          userid: result[i].dataValues.userid,
          firstName: result[i].dataValues.firstName,
          lastName: result[i].dataValues.lastName,
          email: result[i].dataValues.email,
          contact: result[i].dataValues.contact,
          address: result[i].dataValues.address,
          customerName: result[i].dataValues.Customer.dataValues.customerName,
          website: result[i].dataValues.Customer.dataValues.website,
          customer_address: result[i].dataValues.Customer.dataValues.address,
          role: result[i].dataValues.role.dataValues.roleName,
          createdAt: result[i].dataValues.createdAt,
          updatedAt: result[i].dataValues.updatedAt,
        };
        usersList.push(ithObject);
      }
      res.status(200).json(usersList);
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).json({ message: 'Unexpected Error Occured !' });
    });
});

//findbyid
router.get('/:sno', (req, res) => {
  const { sno } = req.params;
  db.User.findAll({
    attributes: [
      'id',
      'userid',
      'firstName',
      'lastName',
      'email',
      'contact',
      'address',
      'createdAt',
      'updatedAt',
    ],
    order: [['id', 'ASC']],
    where: { id: sno },
    include: [
      {
        model: db.Customer,
        attributes: ['customerName', 'website', 'address'],
      },
      {
        model: db.role,
        attributes: ['roleName'],
      },
    ],
  })
    .then((result: any) => {
      const ithObject = {
        sno: result[0].dataValues.id,
        userid: result[0].dataValues.userid,
        firstName: result[0].dataValues.firstName,
        lastName: result[0].dataValues.lastName,
        email: result[0].dataValues.email,
        contact: result[0].dataValues.contact,
        address: result[0].dataValues.address,
        customerName: result[0].dataValues.Customer.dataValues.customerName,
        website: result[0].dataValues.Customer.dataValues.website,
        customer_address: result[0].dataValues.Customer.dataValues.address,
        role: result[0].dataValues.role.dataValues.roleName,
        createdAt: result[0].dataValues.createdAt,
        updatedAt: result[0].dataValues.updatedAt,
      };
      res.status(200).send(ithObject);
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).json({ message: 'Unexpected Error Occured !' });
    });
});

//deletebyid
router.delete('/:sno', async (req, res) => {
  const id = req.params.sno;
  db.User.destroy({
    where: {
      id: id,
    },
  });
  db.Customer.destroy({
    where: {
      id: id,
    },
  });
});

//updatebyid
router.put('/:sno', (req, res) => {
  const id = req.params.sno;
  const User = {
    userid: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contact: req.body.contact,
    address: req.body.address,
  };
  db.User.update(User, {
    where: { id: id },
    returning: true,
    plain: true,
  }).catch((err: any) => {
    console.log(err);
    res.status(500).json({ message: `${err}` });
  });
  const customer = {
    customerName: req.body.customerName,
    website: req.body.website,
    addres: req.body.customer_address,
    userid: req.body.userid,
  };
  db.Customer.update(customer, {
    where: { id: id },
    returning: true,
    plain: true,
  }).catch((err: any) => {
    console.log(err);
    res.status(500).json({ message: `${err}` });
  });
});

//post
router.post('/add', (req, res) => {
  const User = [
    {
      userid: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contact: req.body.contact,
      address: req.body.address,
    },
  ];
  const customer = [
    {
      customerName: req.body.customerName,
      website: req.body.website,
      addres: req.body.customer_address,
      userid: req.body.userid,
    },
  ];
  db.User.bulkCreate(User).catch((err: any) => {
    res.status(500).json({ message: `${err}` });
  });
  db.Customer.bulkCreate(customer).catch((err: any) => {
    res.status(500).json({ message: `${err}` });
  });
});
module.exports = router;
