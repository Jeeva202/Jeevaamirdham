import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const initialPlans = [
    {
        id: 1,
        name: 'Jeevaamirdham Basic',
        benefits: [
            'Access to free content',
            'Limited support',
            'Basic features'
        ]
    },
    {
        id: 2,
        name: 'Jeevaamirdham Elite',
        benefits: [
            'Access to all content',
            'Priority support',
            'Advanced features',
            'Exclusive content'
        ]
    },
    {
        id: 3,
        name: 'Jeevaamirdham Premium',
        benefits: [
            'Access to all content',
            'Priority support',
            'Advanced features',
            'Exclusive content'
        ]
    }
];

export default function PackagePlan() {
    const [plans, setPlans] = useState(initialPlans);
    const [open, setOpen] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedBenefits, setEditedBenefits] = useState([]);

    const handleEdit = (plan) => {
        setCurrentPlan(plan);
        setEditedName(plan.name);
        setEditedBenefits(plan.benefits);
        setOpen(true);
    };

    const handleSave = () => {
        const updatedPlans = plans.map(plan =>
            plan.id === currentPlan.id ? { ...plan, name: editedName, benefits: editedBenefits } : plan
        );
        setPlans(updatedPlans);
        setOpen(false);
    };

    const handleBenefitChange = (index, value) => {
        const updatedBenefits = [...editedBenefits];
        updatedBenefits[index] = value;
        setEditedBenefits(updatedBenefits);
    };

    const handleAddBenefit = () => {
        setEditedBenefits([...editedBenefits, '']);
    };

    const handleDeleteBenefit = (index) => {
        const updatedBenefits = editedBenefits.filter((_, i) => i !== index);
        setEditedBenefits(updatedBenefits);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                Package Plans
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop:"1rem" }}>
                {plans.map(plan => (
                    <Card key={plan.id} sx={{ flex: '1 1 45%', marginBottom: 2 }}>
                        <CardContent>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography variant="h6" gutterBottom>
                                    {plan.name}
                                </Typography>
                                <IconButton onClick={() => handleEdit(plan)} sx={{ border: "2px solid #f09300" }}>
                                    <EditIcon fontSize="small" sx={{ color: "#f09300" }} />
                                </IconButton>
                            </Box>

                            <Typography variant="subtitle2" gutterBottom>
                                Benefits:
                            </Typography>
                            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                                {plan.benefits.map((benefit, index) => (
                                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                        <CheckCircleIcon sx={{ color: 'green', marginRight: 1 }} />
                                        <Typography variant='body2' sx={{ padding: "0.5rem 0" }}>
                                            {benefit}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: "bold" }}>Edit Plan</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Plan Name"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                    <Typography variant="subtitle1" gutterBottom sx={{ marginTop: "1rem" }}>
                        Benefits:
                    </Typography>
                    {editedBenefits.map((benefit, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                size='small'
                                margin="dense"
                                value={benefit}
                                onChange={(e) => handleBenefitChange(index, e.target.value)}
                            />
                            <IconButton onClick={() => handleDeleteBenefit(index)} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button onClick={handleAddBenefit} color="primary" variant='text' sx={{ marginTop: 2, color: "#f09300", }}>
                        Add Benefit
                    </Button>
                </DialogContent>
                <DialogActions sx={{ paddingBottom: "1rem" }}>
                    <Button onClick={() => setOpen(false)} color="primary" variant='outlined' sx={{ color: "#f09300", border: "1px solid #f09300" }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant='contained' sx={{ background: "#f09300" }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
