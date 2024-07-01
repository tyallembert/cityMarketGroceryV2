<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Employee;
use App\Repository\EmployeeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

class EmployeeController extends AbstractController
{
    #[Route('/employee', name: 'create_employee')]
    public function createEmployee(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): Response {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new Response('Invalid JSON', 400);
        }

        $employee = new Employee();
        $employee->setFirstName($data['firstName'] ?? '');
        $employee->setLastName($data['lastName'] ?? '');
        $employee->setEmail($data['email'] ?? '');
        $employee->setMemberNumber($data['memberNumber'] ?? '');
        $employee->setPosition($data['position'] ?? '');

        $errors = $validator->validate($employee);
        if (count($errors) > 0) {
            return new Response((string) $errors, 400);
        }
        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($employee);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response('Saved new product with id '.$employee->getId());
    }

    #[Route('/employee/{id}', name: 'employee_show')]
    public function show(EmployeeRepository $employeeRepository, int $id): Response {
        $employee = $employeeRepository->find($id);

        if (!$employee) {
            throw $this->createNotFoundException('No employee found for id '.$id);
        }

        return new Response('Check out this great employee: '.$employee->getFirstName());
    }

    #[Route('/employees', name: 'employees')]
    public function display(EmployeeRepository $employeeRepository, SerializerInterface $serializer): JsonResponse {
        $employees = $employeeRepository->findAll();
        $jsonContent = $serializer->serialize($employees, 'json', ['groups' => ['employee:read']]);
        return new JsonResponse($jsonContent, 200, [], true);
        // return new JsonResponse($employees);
    }
    #[Route('/employee/delete/{id}', name: 'employee_delete')]
    public function delete(EmployeeRepository $employeeRepository, EntityManagerInterface $entityManager, int $id): Response {
        $employee = $employeeRepository->find($id);
        if(!$employee) {
            throw $this->createNotFoundException('No employee found');
        }
        $entityManager->remove($employee);
        $entityManager->flush();

        return new Response('Successfully deleted Employee');
    }
}
